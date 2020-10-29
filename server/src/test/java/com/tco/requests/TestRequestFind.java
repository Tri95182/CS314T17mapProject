package com.tco.requests;

import com.tco.requests.RequestFind;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestFind {

    private RequestFind find;

    @BeforeEach
    public void createConfigurationForTestCases(){
      find = new RequestFind(false);
      List<Map<String, String>> places = new ArrayList<Map<String, String>>();
      places.add(genPlace("Dave's Airport", "40.0332984924", "-105.124000549", "United States", "Colorado", "Louisville"));
      places.add(genPlace("Dave's Place Airport", "35.82500076293945", "-97.80590057373047", "United States", "Oklahoma", "Kingfisher"));
      find.setPlaces(places);
      find.buildResponse();
    }

    public Map<String, String> genPlace(String name, String lat, String lng, String country, String reg, String munic) {
      Map<String, String> place = new HashMap<String, String>();
      place.put("name", name);
      place.put("latitude", lat);
      place.put("country", country);
      place.put("region", reg);
      place.put("municipality", munic);
      place.put("longitude", lng);
      return place;
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
      String type = find.getRequestType();
      assertEquals("find", type);
    }

    @Test
    @DisplayName("Version number is equal to 4")
    public void testVersion() {
      int version = find.getRequestVersion();
      assertEquals(4, version);
    }

    @Test
    @DisplayName("Match is sanitized")
    public void testSanitize() {
      String match = "~!@#$%^&*()_+-=Test`;:'<>,./?[]{}|\"\\";
      String cleanMatch = find.sanitizeMatch(match);
      assertEquals("_______________Test_________________", cleanMatch);
    }

    @Test
    @DisplayName("Variable places initialized")
    public void testPlaces() {
      Integer resultLen = find.getPlaces().size();
      Integer expectedLen = 2;
      assertEquals(expectedLen, resultLen);
    }

    @Test
    @DisplayName("Variable found initialized")
    public void testFound() {
      int result = find.getFound();
      int expected = 2;
      assertEquals(expected, result);
    }

    @Test
    @DisplayName("Test places after getRandomPlace")
    public void testRandomPlace() {
      find.getRandomPlace();

      int resultLen = find.getPlaces().size();
      int expectedLen = 1;

      int resultFound = find.getFound();
      int expectedFound = 1;

      assertEquals(expectedLen, resultLen);
      assertEquals(expectedFound, resultFound);
    }
  
}
