import AddIcon from "@mui/icons-material/Add";
import { Alert, Button, Card, CardContent, CircularProgress, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import { DeviceCard } from "./DeviceCard";
import { createDevice, getDevice, getDevices } from "./services/devices";

function App() {
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddingDevice, setIsAddingDevice] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState("");

    const reloadDevices = async (displayIsLoading = false) => {
        setIsLoading(displayIsLoading);
        getDevices().then(devices => {
            setDevices(devices);
            setIsLoading(false);
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
        <Stack direction={"column"} spacing={3}>
            {!isLoading && !!devices.length && (
                <Button size="small" startIcon={<AddIcon />} onClick={() => setIsAddingDevice(true)}>
                    New device
                </Button>
            )}
            <Stack spacing={4} direction="row" flexWrap="wrap" useFlexGap justifyContent={"center"}>
                {!!isLoading && <CircularProgress />}
                {!isLoading && !devices.length && (
                    <Alert
                        severity="info"
                        action={
                            <Button size="small" startIcon={<AddIcon />} onClick={() => setIsAddingDevice(true)}>
                                New device
                            </Button>
                        }
                    >
                        The is no device here
                    </Alert>
                )}

                {isAddingDevice && (
                    <Card>
                        <CardContent>
                            <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <TextField
                                    label="Device Name"
                                    variant="outlined"
                                    size="small"
                                    onChange={e => setNewDeviceName(e.target.value)}
                                    value={newDeviceName}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        setIsLoading(true);
                                        setIsAddingDevice(false);
                                        createDevice({ name: newDeviceName, status: "Off", temperature: 0, humidity: 0 }).then(() => {
                                            reloadDevices(true);
                                            setNewDeviceName("");
                                            setIsLoading(false);
                                        });
                                    }}
                                >
                                    Add
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                )}
                {!isLoading &&
                    !!devices.length &&
                    devices.map(device => <DeviceCard key={device.id} device={device} reloadDevices={reloadDevices} reloadDevice={reloadDevice} />)}
            </Stack>
        </Stack>
    );
}

export default App;
