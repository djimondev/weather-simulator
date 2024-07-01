import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import DeviceCard from "./DeviceCard";

function App() {
    const initialDevices = [
        {
            id: 1,
            name: "Device 1",
            status: "On",
            temperature: 25,
            humidity: 40
        },
        {
            id: 2,
            name: "Device 2",
            status: "Off",
            temperature: 30,
            humidity: 50
        },
        {
            id: 3,
            name: "Device 3",
            status: "On",
            temperature: 27,
            humidity: 45
        },
        {
            id: 4,
            name: "Device 4",
            status: "Off",
            temperature: 28,
            humidity: 60
        },
        {
            id: 5,
            name: "Device 5",
            status: "On",
            temperature: 26,
            humidity: 55
        }
    ];

    const [devices, setDevices] = useState(initialDevices);

    useEffect(() => {
        // fetch API in order to pu new data
    }, [devices]);

    return (
        <Stack spacing={4} direction="row" flexWrap="wrap" useFlexGap justifyContent={"center"}>
            {devices.map(device => (
                <DeviceCard key={device.id} device={device} devices={devices} setDevices={setDevices} />
            ))}
        </Stack>
    );
}

export default App;
