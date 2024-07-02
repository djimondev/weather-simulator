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
import { useEffect, useState } from "react";
import { deleteDevice } from "./services/devices";

const MQTT_TOPIC = import.meta.env.VITE_MQTT_TOPIC;

export const DeviceCard = ({ device, reloadDevices, reloadDevice, client, connectStatus, payload }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [temperature, setTemperature] = useState(Number(device.temperature) || 0);
    const [humidity, setHumidity] = useState(Number(device.humidity) || 0);
    const [status, setStatus] = useState(device.status || "Off");
    const [isFocused, setIsFocused] = useState(false);
    const [updatedAt, setUpdatedAt] = useState(device.updatedAt);

    useEffect(() => {
        if (!payload) return;
        try {
            const data = JSON.parse(payload);
            if (data.id !== device.id) return;
            data.temperature !== undefined && setTemperature(Number(data.temperature));
            data.humidity !== undefined && setHumidity(Number(data.humidity));
            data.status !== undefined && setStatus(data.status);
            setIsFocused(true);
            setTimeout(() => {
                setIsFocused(false);
            }, 500);
        } catch (error) {
            console.log(error);
        }
    }, [payload]);

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
            <Card style={{ minWidth: "15vw", padding: "0 30px", ...(isFocused && { backgroundColor: "#b5d3b5" }) }}>
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
                            <Typography variant="h6">{status}</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <Typography variant="body1">Temperature:</Typography>
                            <Typography variant="h6">{temperature}°C</Typography>
                        </Stack>
                        <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                            <Typography variant="body1">Humidity:</Typography>
                            <Typography variant="h6">{humidity}%</Typography>
                        </Stack>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack spacing={2} direction="column" width={"100%"} mx={2}>
                        <ToggleButton
                            value="check"
                            selected={status === "On"}
                            onClick={() => {
                                setStatus(status === "On" ? "Off" : "On");
                                connectStatus === "Connected" &&
                                    client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, status: status === "On" ? "Off" : "On" }));
                            }}
                        >
                            {status === "On" ? "On" : "Off"}
                        </ToggleButton>
                        <Slider
                            disabled={status === "Off"}
                            step={10}
                            marks
                            min={-20}
                            max={70}
                            value={Number(temperature) || 0}
                            onChange={e => {
                                setTemperature(e.target.value);
                                connectStatus === "Connected" && client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, temperature: e.target.value }));
                            }}
                        />
                        <Slider
                            disabled={status === "Off"}
                            step={10}
                            marks
                            min={0}
                            max={100}
                            value={Number(humidity) || 0}
                            onChange={e => {
                                setHumidity(e.target.value);
                                connectStatus === "Connected" && client.publish(MQTT_TOPIC, JSON.stringify({ id: device.id, humidity: e.target.value }));
                            }}
                        />
                        {updatedAt && (
                            <Stack spacing={2} direction="row" width={"100%"} justifyContent={"center"} alignItems={"center"}>
                                <Typography variant="caption">Last updated: {new Date(updatedAt).toLocaleString()}</Typography>
                            </Stack>
                        )}
                    </Stack>
                </CardActions>
            </Card>
        </>
    );
};
