import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import moment from "moment";

moment.locale("ar");

export default function Prayer({ image, title, time }) {
  const formattedTime = moment(time, "HH:mm").format("hh:mm A");
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={title} />
      <CardContent>
        <h2>{title}</h2>
        <Typography
          variant="h4"
          sx={{ color: "text.secondary", fontWeight: "bold" }}
        >
          {formattedTime}
        </Typography>
      </CardContent>
    </Card>
  );
}
