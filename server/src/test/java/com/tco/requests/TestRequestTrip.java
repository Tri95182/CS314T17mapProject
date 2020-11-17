package com.tco.requests;

import java.util.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestTrip {
  private RequestTrip trip;

  public Map<String, String> genPlace(String name, String lat, String lng) {
    Map<String, String> place = new HashMap<>();
    place.put("name", name);
    place.put("latitude", lat);
    place.put("longitude", lng);
    return place;
  }

  @BeforeEach
  public void createConfigurationForTestCases() {
    trip = new RequestTrip("","", new ArrayList<>());
    trip.buildResponse();
  }

  @Test
  @DisplayName("test simple trip request")
  public void testDistances() {
    List<Map<String,String>> places = Arrays.asList(
            genPlace("Alice","0","0"),
            genPlace("Bob","0","100"));
    this.trip = new RequestTrip("title","1",places);
    this.trip.buildResponse();
    List<Long> ans= Arrays.asList((long)2,(long)2);
    assertEquals(ans, trip.getDistances());
  }

  @Test
  @DisplayName("test 1 place")
  public void testOnePlace() {
    List<Map<String,String>> places = Arrays.asList(
            genPlace("Alice","0","0"));
    this.trip = new RequestTrip("title","1",places);
    this.trip.buildResponse();
    List<Long> ans= Arrays.asList((long)0);
    assertEquals(ans, trip.getDistances());
  }

  @Test
  @DisplayName("test empty trip request")
  public void testEmptyDistances() {
    this.trip = new RequestTrip("title","1",new ArrayList<>());
    this.trip.buildResponse();
    assertEquals(0, trip.getDistances().size());
  }

  @Test
  @DisplayName("Request type is \"trip\"")
  public void testType() {
    String type = trip.getRequestType();
    assertEquals("trip", type);
  }
}