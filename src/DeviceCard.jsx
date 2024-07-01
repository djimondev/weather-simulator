import { Card, CardActions, CardContent, Slider, Stack, ToggleButton, Typography } from "@mui/material";

function DeviceCard({ device, devices, setDevices }) {
    return (
        <Card style={{ minWidth: "15vw", padding: "30px" }}>
            <CardContent>
                <Typography variant="h4">{device.name}</Typography>
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
                <Stack spacing={2} direction="column" width={"100%"}>
                    <ToggleButton
                        value="check"
                        selected={device.status === "On"}
                        onClick={() => {
                            setDevices(
                                devices.map(d => {
                                    if (d.id === device.id) {
                                        return {
                                            ...d,
                                            status: d.status === "On" ? "Off" : "On"
                                        };
                                    }
                                    return d;
                                })
                            );
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
                            setDevices(
                                devices.map(d => {
                                    if (d.id === device.id) {
                                        return {
                                            ...d,
                                            temperature: e.target.value
                                        };
                                    }
                                    return d;
                                })
                            );
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
                            setDevices(
                                devices.map(d => {
                                    console.log(e.target.value);
                                    if (d.id === device.id) {
                                        return {
                                            ...d,
                                            humidity: e.target.value
                                        };
                                    }
                                    return d;
                                })
                            );
                        }}
                    />
                </Stack>
            </CardActions>
        </Card>
    );
}

export default DeviceCard;
