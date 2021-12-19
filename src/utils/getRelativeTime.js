import moment from "moment";

export default function getRelativeTime(time) {
  return moment(time).startOf("seconds").fromNow();
}
