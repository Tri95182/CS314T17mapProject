package com.tco.requests;

import com.tco.requests.RequestFind;

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
  
}
