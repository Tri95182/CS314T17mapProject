package com.tco.requests;

import com.tco.requests.RequestDistance;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestDistance {
  private RequestDistance distance;

  @BeforeEach
  public void createConfigurationForTestCases(){
    distance = new RequestDistance(0,"0","0","0","0");
    distance.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"distance\"")
  public void testType() {
    String type = distance.getRequestType();
    assertEquals("distance", type);
  }

  @Test
  @DisplayName("Request ColoradoDiagonal")
  public void testColoradoDiagonal() {
    distance = new RequestDistance(3959,"41","-109","37","-102");
    distance.buildResponse();
    assertEquals(466L, distance.getDistance());
  }

  @Test
  @DisplayName("Request WellingtonToMadrid")
  public void testWellingtonToMadrid() {
    distance = new RequestDistance(6371008771.4,"40.416775","-3.703790","-41.276825","174.777969");
    distance.buildResponse();
    assertEquals(19855573534L, distance.getDistance());
  }

  @Test
  @DisplayName("Request NanoMeter")
  public void testNanoMeter() {
    distance = new RequestDistance(6378159999999974L,"40.5734","-105.0865","40.5734","-105.08650000000001");
    distance.buildResponse();
    assertEquals(1, distance.getDistance());
  }
}