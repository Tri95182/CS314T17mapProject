package com.tco.misc;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Database {

    private final static Logger log = LoggerFactory.getLogger(Database.class);

    private final static String IS_TRAVIS = System.getenv("TRAVIS");
    private final static String USE_TUNNEL = System.getenv("CS314_USE_DATABASE_TUNNEL");
    private final static String DB_URL = (IS_TRAVIS != null && IS_TRAVIS.equals("true")) ? 
                                         "jdbc:mysql://127.0.0.1/cs314" : 
                                         (USE_TUNNEL != null && USE_TUNNEL.equals("true")) ? 
                                         "jdbc:mysql://127.0.0.1:56247/cs314" :
                                         "jdbc:mysql://faure.cs.colostate.edu/cs314";

    private final static String DB_USER = (IS_TRAVIS != null && IS_TRAVIS.equals("true")) ? 
                                          "root" : 
                                          "cs314-db";
    private final static String DB_PASSWORD = (IS_TRAVIS != null && IS_TRAVIS.equals("true")) ? 
                                              null : 
                                              "eiK5liet1uej";

    private final static String FIND_QUERY = "SELECT world.name, world.municipality, region.name, country.name, continent.name, world.latitude, world.longitude\n" +
                                             "FROM continent\n" +
                                             "INNER JOIN country ON continent.id = country.continent\n" +
                                             "INNER JOIN region ON country.id = region.iso_country\n" +
                                             "INNER JOIN world ON region.id = world.iso_region\n" +
                                             "WHERE country.name LIKE @phrase\n" +
                                             "OR region.name LIKE @phrase\n" +
                                             "OR world.name LIKE @phrase\n" +
                                             "OR world.municipality LIKE @phrase;";

    public static List<Map<String, String>> queryFind(String match) {
        final String MATCH_VAR = "SET @phrase=\"%" + match + "%\"\n;";

        List<Map<String, String>> places = new ArrayList<Map<String,String>>();

        try (
            Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD);
            Statement query = conn.createStatement();
            ResultSet setVarResults = query.executeQuery(MATCH_VAR);
            ResultSet results = query.executeQuery(FIND_QUERY);
        ) {
            while (results.next()) {
                places.add(processFindResult(results));
            }
        } catch (Exception e) {
            log.error("Error when performing queryFind: {}", e.getMessage());
        }

        return places;
    }

    private static Map<String, String> processFindResult(ResultSet results) throws Exception {

        Map<String, String> place = new HashMap<String, String>();
        place.put("country_name", results.getString("country.name"));
        place.put("region_name", results.getString("region.name"));
        place.put("world_name", results.getString("world.name"));
        place.put("world_municipality", results.getString("world.municipality"));
        place.put("latitude", results.getString("world.latitude"));
        place.put("longitude", results.getString("world.longitude"));

        return place;
    }
    
}