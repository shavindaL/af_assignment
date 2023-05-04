import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function StatCard({ icon, cardTitle, count }) {
  return (
    <Card className="w-[250px] h-[250px] border">
      <CardActionArea className="w-[300px] h-[300px] justify-center">
        <CardMedia align="center" className="pt-[10px]">
          <Avatar sx={{ bgcolor: "#1565c0" }}>
            {icon}
          </Avatar>
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {cardTitle}
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ fontWeight: "bold", fontStyle: "italic" }}
          >
            {count}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
