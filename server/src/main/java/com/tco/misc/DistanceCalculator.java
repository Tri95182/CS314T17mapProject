package com.tco.misc;

import java.util.Map;
import java.lang.Math;

public class DistanceCalculator {

  final double DEGREE_TO_RADIAN = Math.PI/ 180;

  public long calculate(Double radius, Map<String, String> place1, Map<String, String> place2) {
    double lat1 = Double.parseDouble(place1.get("latitude")) * DEGREE_TO_RADIAN;
    double lon1 = Double.parseDouble(place1.get("longitude")) * DEGREE_TO_RADIAN;
    double lat2 = Double.parseDouble(place2.get("latitude")) * DEGREE_TO_RADIAN;
    double lon2 = Double.parseDouble(place2.get("longitude")) * DEGREE_TO_RADIAN;

    double sinLat1 = Math.sin(lat1);
    double cosLat1 = Math.cos(lat1);
    double sinLat2 = Math.sin(lat2);
    double cosLat2 = Math.cos(lat2);
    double deltaLon = Math.abs(lon2 - lon1);
    double sinDeltaLon = Math.sin(deltaLon);
    double cosDeltaLon = Math.cos(deltaLon);

    double centralAngleNumerator = Math.sqrt(Math.pow(cosLat2 * sinDeltaLon,2)
            + Math.pow((cosLat1 * sinLat2) - (sinLat1 * cosLat2 * cosDeltaLon),2));
    double centralAngleDenominator = (sinLat1 * sinLat2) + (cosLat1 * cosLat2 * cosDeltaLon);

    double centralAngle = Math.atan2(centralAngleNumerator,centralAngleDenominator);
    double distance = radius * centralAngle;

    return Math.round(distance);
  }
}