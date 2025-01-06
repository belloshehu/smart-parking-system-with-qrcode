"use client";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Space } from "./Space";
import { FaSpinner } from "react-icons/fa";
import { BiSad } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import mqtt, { IClientOptions, MqttClient } from "mqtt";
import { useDispatch, useSelector } from "react-redux";
import {
  updateSpace,
  setSpaces,
} from "../GlobalRedux/features/space/spaceSlice";
import axios from "axios";
import { setMqttClient } from "../GlobalRedux/features/iot/iotSlice";

type SpaceType = {
  _id: string;
  id: string;
  price: number;
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const SpaceList = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const { spaces } = useSelector((store: any) => store.space);
  const { mqttClient } = useSelector((store: any) => store.iot);
  const dispatch = useDispatch();
  // const [client, setClient] = useState<any>(null);
  const host = "wss://broker.emqx.io:8084/mqtt";
  const clientId = `mqttjs_1+ ${Math.random().toString(16).substr(2, 8)}`;
  // const clientId = "mqttx_06d17e47";
  const options: IClientOptions = {
    keepalive: 60,
    clientId: clientId,
    protocolId: "MQTT",
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: "WillMsg",
      payload: "Connection Closed abnormally..!",
      qos: 0,
      retain: false,
    },
  };

  const client: MqttClient = mqtt.connect(host, options);

  const connectClient = useCallback(() => {
    const client: MqttClient = mqtt.connect(host, options as any);
    dispatch(setMqttClient(client));
  }, []);

  useEffect(() => {
    const getSpaces = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/space");
        const spaceData = await data.spaces;
        dispatch(setSpaces(spaceData));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getSpaces();
  }, []);

  useEffect(() => {
    connectClient();
  }, []);

  client?.on("connect", function () {
    console.log("connected");
    client?.subscribe("/car/parking/system/space");
  });

  client?.on("message", function (topic: string, message: string) {
    console.log(message.toString().split(","));
    const receivedMessage = message.toString().split(",");
    receivedMessage.forEach((space: string) => {
      let [spaceId, spaceStatus] = space.trim().split("=");
      spaceId = spaceId.trim();
      spaceStatus = spaceStatus === "1" ? "occupied" : "free";
      // update status of the target space
      updateSpaceStatus(spaceId, spaceStatus);
    });
  });

  client.on("reconnect", function () {
    console.log("Reconnecting");
  });
  client.on("error", function () {
    console.log("Connection error");
  });

  const updateSpaceStatus = async (spaceId: string, spaceStatus: string) => {
    if (spaces.length > 0) {
      const spaceToUpdate = spaces.filter(
        (space: SpaceType) => space.id === spaceId
      )[0];
      console.log(spaceToUpdate, spaces.length, spaceStatus);
      // update status of the target space
      if (spaceToUpdate) {
        console.log("new space: ", { ...spaceToUpdate, status: spaceStatus });
        // update space document in database
        try {
          const { data } = await axios.patch(
            `/api/space/mqtt/${spaceToUpdate._id}`,
            {
              ...spaceToUpdate,
              status: spaceStatus,
            }
          );
          dispatch(updateSpace(data.space));
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <FaSpinner className="text-xl animate-spin" />
      </div>
    );
  }
  if (spaces?.length === 0 || !spaces) {
    return (
      <div className="flex flex-col gap-3 justify-center items-center bg-slate-100 p-5">
        <p>Oops! there are no spaces yet</p>
        <BiSad className="text-primary text-3xl md:text-5xl" />
        {/* Only show button on other pages beside admin pages */}
        {!pathname.includes("/admin") && (
          <Link
            className="bg-primary text-white rounded-md p-2 px-4"
            href={"/dashboard/admin/spaces"}>
            Add parking Spaces
          </Link>
        )}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-0 md:px-20 w-full gap-8 my-5">
      {spaces?.map((space: SpaceType) => (
        <Space key={space._id} space={space} />
      ))}
    </div>
  );
};

export default memo(SpaceList);
