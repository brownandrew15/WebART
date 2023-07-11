package controllers;

import org.json.JSONObject;

import art.ARTRunner;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;



/**
 * The Jersey handler for the /api endpoints.
 */
@Path("/") // the /api part of the path is added by the context handler
public class APIController {

    ARTRunner art = new ARTRunner();
    
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


    /**
     * Runs ART with the given ART Specification and Sample Program.
     * 
     * @param jsonRequest the JSON data from the front end that contains the specification and program
     * @return A JSON object containing the output from ART
     */
    @POST
    @Path("run")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String run(String jsonRequest) {

        JSONObject data = new JSONObject(jsonRequest);

        String artSpecification = data.getString("art");
        String sampleProgram = data.getString("str");

        JSONObject json = art.run(artSpecification, sampleProgram);

        return json.toString();

    }


    /**
     * Returns the mapping of syntax highlighting colours to the keywords that should be highlighting.
     * 
     * @return A JSON object containing the colour to list of keywords mapping
     */
    @GET
    @Path("art-keywords")
    @Produces(MediaType.APPLICATION_JSON)
    public String getARTKeywords() {
        JSONObject data = art.getARTKeywords();
        return data.toString();
    }


}
