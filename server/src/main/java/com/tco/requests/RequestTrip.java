package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.misc.DistanceCalculator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

public class RequestTrip extends RequestHeader {
  private Map<String, String> options;
  private List<Map<String, String>> places;

  public RequestTrip() {
    this.requestType = "trip";
    this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
  }

  @Override
  public void buildResponse() throws BadRequestException {

  }
}
