package com.tco.misc;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

import com.tco.misc.Database;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestDatabase {

    private Database db;

    @Test
    @DisplayName("Test query results")
    public void testQuery() {
      String match = "dave_s_airport";
      List<Map<String, String>> results = db.queryFind(match, new ArrayList<String>(), new ArrayList<String>());

      List<Map<String, String>> expected = new ArrayList<Map<String, String>>();
      Map<String, String> place1 = new HashMap<String, String>();
      place1.put("name", "Dave's Airport");
      place1.put("latitude", "40.0332984924");
      place1.put("longitude", "-105.124000549");
      place1.put("id", "0CO1");
      place1.put("country_code", "US");
      place1.put("altitude", "5170");
      place1.put("municipality", "Louisville");
      place1.put("type", "small_airport");
      place1.put("region", "Colorado");
      place1.put("country", "United States");
      place1.put("url", null);
      expected.add(place1);

      assertEquals(expected, results);
    }
    
    @Test
    @DisplayName("Test query results with narrow")
    public void testQueryNarrow() {
      String match = "dave_s_airport";
      List<Map<String, String>> results = db.queryFind(match, new ArrayList<String>(Arrays.asList("heliport")), new ArrayList<String>(Arrays.asList("United States")));

      assertEquals(results.size(), 0);
    }
}
