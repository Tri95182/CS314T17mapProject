package com.tco.requests;

import com.tco.requests.RequestDistance;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestDistance {

  @Test
  @DisplayName("Request type is \"Distance\"")
  public void testColoradoDiagonal() {
    RequestDistance distance = new RequestDistance(3959.0,"41","-109","37","-102");
    distance.buildResponse();
    assertEquals(466L, distance.getDistance());
  }

  @Test
  @DisplayName("Request type is \"Distance\"")
  public void testWellingtonToMadrid() {
    RequestDistance distance = new RequestDistance(6371008771.4,"40.416775","-3.703790","-41.276825","174.777969");
    distance.buildResponse();
    assertEquals(19855573534L, distance.getDistance());
  }
}