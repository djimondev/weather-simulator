import { Card, CardActions, CardContent, CardHeader, CircularProgress, Slider, Stack, ToggleButton, Typography } from "@mui/material";
import { useState } from "react";
import { patchDevice } from "./services/devices";

export const DeviceCard = ({ device, reloadDevices, reloadDevice }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Card style={{ minWidth: "15vw", padding: "0 30px" }}>
            <CardHeader title={device.name} action={isLoading && <CircularProgress size={20} thickness={5} />}></CardHeader>
            <CardContent>
                <Stack py={2} spacing={1} direction="column" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                    <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="body1">Status:</Typography>
                        <Typography variant="h6">{device.status}</Typography>
                    </Stack>
                    <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="body1">Temperature:</Typography>
                        <Typography variant="h6">{device.temperature}°C</Typography>
                    </Stack>
                    <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                        <Typography variant="body1">Humidity:</Typography>
                        <Typography variant="h6">{device.humidity}%</Typography>
                    </Stack>
                </Stack>
            </CardContent>
            <CardActions>
                <Stack spacing={2} direction="column" width={"100%"} mx={2}>
                    <ToggleButton
                        value="check"
                        selected={device.status === "On"}
                        onClick={() => {
                            setIsLoading(true);
                            patchDevice(device.id, { status: device.status === "On" ? "Off" : "On" }).then(() => {
                                reloadDevices();
                                setIsLoading(false);
                            });
                        }}
                    >
                        {device.status === "On" ? "On" : "Off"}
                    </ToggleButton>
                    <Slider
                        defaultValue={device.temperature}
                        disabled={device.status === "Off"}
                        step={10}
                        marks
                        min={-20}
                        max={70}
                        onChange={e => {
                            setIsLoading(true);
                            patchDevice(device.id, { temperature: e.target.value }).then(() => {
                                setTimeout(() => {
                                    reloadDevices();
                                    setIsLoading(false);
                                }, 500);
                            });
                        }}
                    />
                    <Slider
                        defaultValue={device.humidity}
                        disabled={device.status === "Off"}
                        step={10}
                        marks
                        min={0}
                        max={100}
                        onChange={e => {
                            setIsLoading(true);
                            patchDevice(device.id, { humidity: e.target.value }).then(() => {
                                setTimeout(() => {
                                    reloadDevices();
                                    setIsLoading(false);
                                }, 500);
                            });
                        }}
                    />
                </Stack>
            </CardActions>
        </Card>
    );
};
