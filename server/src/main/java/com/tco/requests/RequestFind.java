package com.tco.requests;

import com.tco.misc.BadRequestException;
import com.tco.misc.Database;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestFind extends RequestHeader {

    private String match;
    private Integer limit;
    private Integer found;
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

      if(this.useDatabase) {
          this.places = Database.queryFind(cleanMatch);
      }

      if(this.places != null) {
          this.found = this.places.size();
          if(this.limit != null && this.limit != 0 && this.found > this.limit) {
              this.places.subList(this.limit, this.found).clear();
          } else if((this.limit == null || this.limit == 0) && this.places.size() > this.INTERNAL_LIMIT) {
              this.places.subList(this.INTERNAL_LIMIT, this.found).clear();
          }
      }

      log.trace("buildResponse -> {}", this);
    }

    public String sanitizeMatch(String match) {
        if(match != null && match.length() != 0) {
            return match.replaceAll("[^A-Za-z0-9]", "_");
        } else {
            return "";
        }
    }
  
}
