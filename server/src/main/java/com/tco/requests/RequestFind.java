package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.misc.Database;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader {

    private String match;
    private Integer limit;
    private Integer found;
    private Map<String, List<String>> narrow;
    private List<Map<String, String>> places;
    private transient Boolean useDatabase = true;
    
    private final transient Logger log = LoggerFactory.getLogger(RequestFind.class);
    private final transient Integer INTERNAL_LIMIT = 150;
  
    public RequestFind() {
      this.requestType = "find";
      this.requestVersion = RequestHeader.CURRENT_SUPPORTED_VERSION;
    }

    // The following constructor is for testing purposes

    public RequestFind(boolean useDatabase) {
      this();
      this.useDatabase = useDatabase;
    }

    @Override
    public void buildResponse() {
      String cleanMatch = sanitizeMatch(this.match);
      List<String> narrowType = processNarrow("type");
      List<String> narrowWhere = processNarrow("where");

      if(this.useDatabase) {
        this.places = Database.queryFind(cleanMatch, narrowType, narrowWhere);
      }

      if(this.places != null) {
        if(cleanMatch == "" && this.useDatabase) {
          getRandomPlace();
        } else {
          this.found = this.places.size();
          if(varExists(this.limit) && this.found > this.limit) {
            this.places.subList(this.limit, this.found).clear();
          } else if(!varExists(this.limit) && this.found > this.INTERNAL_LIMIT) {
            this.places.subList(this.INTERNAL_LIMIT, this.found).clear();
          }
        }
      }

      log.trace("buildResponse -> {}", this);
    }

    private List<String> processNarrow(String name) {
      List<String> arr = new ArrayList<String>();
      if(this.narrow != null && this.narrow.size() != 0) {
        if(this.narrow.containsKey(name)) {
          List<String> temp = new ArrayList<String>(this.narrow.get(name));
          for(int i = 0; i < temp.size(); i++) {
            arr.add(sanitizeMatch(temp.get(i)));
          }
        }
      }

      return arr;
    }

    private Boolean varExists(Integer var) {
      return var != null && var != 0;
    }

    public String sanitizeMatch(String match) {
      if(match != null && match.length() != 0) {
        return match.replaceAll("[^A-Za-z0-9]", "_");
      } else {
        return "";
      }
    }

    public void getRandomPlace() {
      int size = this.places.size();
      if(size > 0) {
        Random rand = new Random();
        List<Map<String,String>> tempPlaces = new ArrayList<Map<String,String>>();
        List<Integer> randHistory = new ArrayList<Integer>();
        int randCount = this.limit != null ? this.limit : 1;
        this.found = randCount;

        while(randCount > 0) {
          int randNum = rand.nextInt(size);
          if(randNum == 0) randNum += 1;
          if(randHistory.contains(randNum)) {
            continue;
          } else {
            randCount--;
            randHistory.add(randNum);
            tempPlaces.add(this.places.get(randNum));
          }
        }

        this.places = tempPlaces;
      }
    }

    // The functions below are for testing purposes

    public List<Map<String, String>> getPlaces() {
      return places;
    }

    public void setPlaces(List<Map<String, String>> places) {
      this.places = places;
    }

    public Integer getFound() {
      return found;
    }
  
}
