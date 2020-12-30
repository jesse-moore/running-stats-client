import { gql } from "@apollo/client";

const STAT_DETAILS = gql`
  fragment StatDetails on Stat {
    type
    stat_id
    year
    month
    total_distance
    average_distance
    total_elev_gain
    average_elev_gain
    total_moving_time
    average_moving_time
    count
    average_speed
    daysOfWeek
	periodOfDay
  }
`;

export const STAT = gql`
  query($year: Int, $month: Int) {
    stat(year: $year, month: $month) {
      ...StatDetails
    }
  }
  ${STAT_DETAILS}
`;

export const AVAILABLE_STATS = gql`
  query {
    availableStats
  }
`;

export const INIT_STATS = gql`
  query($year: Int, $month: Int) {
    stat(year: $year, month: $month) {
      ...StatDetails
    }
    availableStats
  }
  ${STAT_DETAILS}
`;
