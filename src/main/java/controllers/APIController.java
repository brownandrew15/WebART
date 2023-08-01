package controllers;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Scanner;

import org.json.JSONObject;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import server.ARTServer;
import server.Resources;



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
        int artVersion = data.getInt("art-version");

        JSONObject json = ARTServer.getARTRunner().run(artSpecification, sampleProgram, artVersion);

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

        // get the syntax highlighting specification
        String filename = "internal/syntax_highlighting/art_keywords.json";
        String jsonString;
        try {
            jsonString = Resources.readFromJar(filename); 
        } catch (IOException e) {
            // the file could not be found - return no configuration
            System.err.println("Could not read " + filename);
            jsonString = "{}";
        }
    
        return jsonString;
    }


}
