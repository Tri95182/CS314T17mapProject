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
      find.buildResponse();
    }

    @Test
    @DisplayName("Request type is \"find\"")
    public void testType() {
      String type = find.getRequestType();
      assertEquals("find", type);
    }

    @Test
    @DisplayName("Version number is equal to 2")
    public void testVersion() {
      int version = find.getRequestVersion();
      assertEquals(2, version);
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
      List<Map<String, String>> result = find.getPlaces();
      List<Map<String, String>> expected = new ArrayList<Map<String, String>>();
      assertEquals(expected, result);
    }

    @Test
    @DisplayName("Variable found initialized")
    public void testFound() {
      int result = find.getFound();
      int expected = 0;
      assertEquals(expected, result);
    }
  
}
