package com.tco.requests;

import com.tco.requests.RequestConfig;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestRequestConfig {

  private RequestConfig conf;

  @BeforeEach
  public void createConfigurationForTestCases(){
    conf = new RequestConfig();
    conf.buildResponse();
  }

  @Test
  @DisplayName("Request type is \"config\"")
  public void testType() {
    String type = conf.getRequestType();
    assertEquals("config", type);
  }

  @Test
  @DisplayName("Version number is equal to 4")
  public void testVersion() {
    int version = conf.getRequestVersion();
    assertEquals(4, version);
  }


  @Test
  @DisplayName("Team name is t17 Team Bloo")
  public void testServerName() {
    String name = conf.getServerName();
    assertEquals("t17 Team Bloo", name);
  }

  @Test
  @DisplayName("Supported Requests length")
  public void testSupportedRequestsLength() {
    List<String> supportedRequests = conf.getSupportedRequests();
    assertEquals(4, supportedRequests.size());
  }

  @Test
  @DisplayName("Supported Requests contents")
  public void testSupportedRequestscontents() {
    List<String> supportedRequests = conf.getSupportedRequests();
    List<String> actualSupportedRequests =  new ArrayList();
    actualSupportedRequests.add("config");
    actualSupportedRequests.add("distance");
    actualSupportedRequests.add("find");
    actualSupportedRequests.add("trip");
    assertEquals(actualSupportedRequests, supportedRequests);
  }

  @Test
  @DisplayName("Filters are set")
  public void testFilters() {
    Map<String, List<String>> filters = conf.getFilters();
    List<String> filterType = filters.get("type");
    List<String> filterWhere = filters.get("where");
    assertEquals(filterType.size(), 3);
    assertEquals(filterWhere.size(), 195);
  }
}