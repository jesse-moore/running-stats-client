import { gql } from "@apollo/client";

const ACTIVITY_DETAILS = gql`
  fragment ActivityDetails on Activity {
    name
    distance
    moving_time
    total_elevation_gain
    start_date_local
    start_latlng {
      lat
      lng
    }
    end_latlng {
      lat
      lng
    }
    map {
      summary_polyline
    }
    average_speed
    elev_high
    elev_low
  }
`;

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

export const ACTIVITIES = gql`
  query($page: Int, $perPage: Int, $year: Int, $month: Int) {
    activities(page: $page, perPage: $perPage, year: $year, month: $month) {
      ...ActivityDetails
    }
  }
  ${ACTIVITY_DETAILS}
`;

export const ROUTES = gql`
  query($year: Int, $month: Int) {
    activities(year: $year, month: $month) {
      strava_id
      start_latlng {
        lat
        lng
      }
      map {
        summary_polyline
      }
    }
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
