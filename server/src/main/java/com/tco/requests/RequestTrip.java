package com.tco.requests;

import com.tco.misc.DistanceCalculator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class RequestTrip extends RequestHeader {
  private Map<String, String> options;
  private List<Map<String, String>> places;
  private List<Long> distances;

  private final transient Logger log = LoggerFactory.getLogger(RequestConfig.class);

  @Override
  public void buildResponse() {
    this.distances = new ArrayList<>();
    if(!this.places.isEmpty()) {
      GenerateDistancesList();
    }
    log.trace("buildResponse -> {}", this);
  }

  private void GenerateDistancesList() {
    DistanceCalculator distanceCalc = new DistanceCalculator();

    double earthRadius = Double.parseDouble(options.get("earthRadius"));
    long distance;

    if(this.places.size() > 1) {
      // distance between [i] and [i+1]
      for (int i = 0; i < this.places.size() - 1; i++) {
        distance = distanceCalc.calculate(earthRadius, this.places.get(i), this.places.get(i + 1));
        distances.add(distance);
      }
      // distance between first and last
      distance = distanceCalc.calculate(earthRadius, this.places.get(0), this.places.get(this.places.size() - 1));
      this.distances.add(distance);
    }
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
