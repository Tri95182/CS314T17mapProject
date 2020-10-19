package com.tco.requests;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class TestRequestTrip {
  private RequestTrip trip;

  public Map<String, String> genPlace(String name, String lat, String lng, String country, String reg, String munic) {
    Map<String, String> place = new HashMap<>();
    place.put("name", name);
    place.put("latitude", lat);
    place.put("country", country);
    place.put("region", reg);
    place.put("municipality", munic);
    place.put("longitude", lng);
    return place;
  }

  @Test
  @DisplayName("Request type is \"Trip\"")
  public void testDistances() {
    List<Map<String,String>> places = Arrays.asList(
            genPlace("Alice","0","0","","",""),
            genPlace("Bob","0","100","","",""));
    trip = new RequestTrip("title","1",places);
    trip.buildResponse();
    List<Long> ans= Arrays.asList((long)2,(long)2);
    assertEquals(ans, trip.getDistances());
  }

}
