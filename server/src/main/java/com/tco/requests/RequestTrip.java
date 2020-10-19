package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class RequestTrip extends RequestHeader {
  private Map<String, String> options;
  private List<Map<String, String>> places;
  private List<Long> distances;

  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  @Override
  public void buildResponse() {
    GenerateDistancesList();

    log.trace("buildResponse -> {}", this);
  }

  private void GenerateDistancesList() {
    this.distances = Arrays.asList((long)2,(long)2);
  }

  //for testing purposes

  public RequestTrip() {
    this.requestType = "trip";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  public RequestTrip(String title, String radius, List<Map<String, String>> places) {
    this();
    distances = null;
    this.options = new HashMap<>();
    this.options.put("title", title);
    this.options.put("earthRadius", radius);
    this.places = places;
  }

  public List<Long> getDistances() {
    return distances;
  }
}
