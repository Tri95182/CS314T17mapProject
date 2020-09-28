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
    RequestDistance distance = new RequestDistance(3959f,"41","-109","37","102");
    distance.buildResponse();
    assertEquals(466, distance.getDistance());
  }
}