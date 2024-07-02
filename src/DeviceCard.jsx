import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    Menu,
    MenuItem,
    Slider,
    Stack,
    ToggleButton,
    Typography
} from "@mui/material";
import { useState } from "react";
import { deleteDevice } from "./services/devices";

const MQTT_TOPIC = import.meta.env.VITE_MQTT_TOPIC;

export const DeviceCard = ({ device, reloadDevices, reloadDevice, client }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = event => {
        console.log(event.currentTarget);
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        confirm("Are you sure you want to delete this device?") && performDelete();
    };

    const performDelete = () => {
        setIsLoading(true);
        deleteDevice(device.id).then(() => {
            reloadDevices(true);
            setIsLoading(false);
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
            <Card style={{ minWidth: "15vw", padding: "0 30px" }}>
                <CardHeader
                    title={
                        <Stack spacing={2} direction="row" width={"100%"} justifyContent={"space-between"} alignItems={"start"}>
                            <Stack direction={"column"} justifyContent={"start"} alignItems={"start"}>
                                <Typography variant="h6">{device.name}</Typography>
                                <Typography variant="body2">{device.id}</Typography>
                            </Stack>
                            <Box width={20} height={6}>
                                {isLoading ? (
                                    <CircularProgress size={30} />
                                ) : (
                                    <IconButton aria-label="settings" onClick={e => handleClick(e)}>
                                        <MoreVertIcon />
                                    </IconButton>
                                )}
                            </Box>
                        </Stack>
                    }
                ></CardHeader>

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
                                client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, status: device.status === "On" ? "Off" : "On" }));
                                // setIsLoading(true);
                                // patchDevice(device.id, { status: device.status === "On" ? "Off" : "On" }).then(() => {
                                //     reloadDevices();
                                //     setIsLoading(false);
                                // });
                            }}
                        >
                            {device.status === "On" ? "On" : "Off"}
                        </ToggleButton>
                        <Slider
                            disabled={device.status === "Off"}
                            step={10}
                            marks
                            min={-20}
                            max={70}
                            onChange={e => {
                                client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, temperature: e.target.value }));
                                // setIsLoading(true);
                                // patchDevice(device.id, { temperature: e.target.value }).then(() => {
                                //     setTimeout(() => {
                                //         reloadDevices();
                                //         setIsLoading(false);
                                //     }, 500);
                                // });
                            }}
                        />
                        <Slider
                            disabled={device.status === "Off"}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            onChange={e => {
                                client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, humidity: e.target.value }));
                                // setIsLoading(true);
                                // patchDevice(device.id, { humidity: e.target.value }).then(() => {
                                //     setTimeout(() => {
                                //         reloadDevices();
                                //         setIsLoading(false);
                                //     }, 500);
                                // });
                            }}
                        />
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
};
