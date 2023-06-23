package controllers;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

/**
 * The Jersey handler for the /api endpoints.
 */
@Path("/") // the /api part of the path is added by the context handler
public class APIController {
    
    /**
     * The endpoint for /api/. 
     * This returns a plain text string and the only purpose is that it allows 
     * for a quick test that Jersey is returning responses correctly.
     * 
     * @return A test string
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String test() {
        return "Hello World! This is WebART!";
    }


}
