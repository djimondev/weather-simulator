import { CircularProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { DeviceCard } from "./DeviceCard";
import { getDevice, getDevices } from "./services/devices";

function App() {
    const [devices, setDevices] = useState([]);

    const reloadDevices = async () => {
        getDevices().then(devices => {
            setDevices(devices);
        });
    };

    const reloadDevice = async id => {
        getDevice(id).then(device => {
            let unsortedDevices = [...devices.filter(d => d.id !== id), device];
            unsortedDevices.sort((a, b) => b.id - a.id);
            setDevices(unsortedDevices);
        });
    };

    useEffect(() => {
        reloadDevices();
    }, []);

    return (
        <Stack spacing={4} direction="row" flexWrap="wrap" useFlexGap justifyContent={"center"}>
            {devices.length === 0 && <CircularProgress />}
            {devices.map(device => (
                <DeviceCard key={device.id} device={device} reloadDevices={reloadDevices} reloadDevice={reloadDevice} />
            ))}
        </Stack>
    );
}

export default App;
