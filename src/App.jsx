import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import DeviceCard from "./DeviceCard";
import { getDevices } from "./services/devices";

function App() {
    const [devices, setDevices] = useState([]);

    useEffect(() => {
        getDevices().then(devices => {
            setDevices(devices);
        });
    }, []);

    return (
        <Stack spacing={4} direction="row" flexWrap="wrap" useFlexGap justifyContent={"center"}>
            {devices.map(device => (
                <DeviceCard key={device.id} device={device} devices={devices} setDevices={setDevices} />
            ))}
        </Stack>
    );
}

export default App;
