package com.tco.requests;

import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class RequestDistance extends RequestHeader {

  private Long distance;
  private Double earthRadius;

  private Map<String,String> place1, place2;

  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  @Override
  public void buildResponse() {
    DistanceCalculator distanceCalc = new DistanceCalculator();
    this.distance = distanceCalc.calculate(this.earthRadius, this.place1, this.place2);
      log.trace("buildResponse -> {}", this);
  }

  // The following constructor is for testing purposes

  public RequestDistance() {
    this.requestType = "distance";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }


  public RequestDistance(double radius, String lat1, String lon1, String lat2, String lon2) {
      this();
      this.distance = null;
      this.earthRadius = radius;
      this.place1 = new HashMap();
      this.place1.put("latitude", lat1);
      this.place1.put("longitude", lon1);
      this.place2 = new HashMap();
      this.place2.put("latitude", lat2);
      this.place2.put("longitude", lon2);
    }

    public Long getDistance() {
      return distance;
    }
}