import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import DeviceCard from "./DeviceCard";
import { devices as initialDevices } from "./services/devices";

function App() {
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
