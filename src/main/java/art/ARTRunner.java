package art;

import java.io.PrintStream;
import java.util.Arrays;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import server.Resources;
import server.StringsOutputStream;
import uk.ac.rhul.cs.csle.art.ART;

/**
 * Interface between WebART and the ART.jar library that returns JSON data 
 */
public class ARTRunner {

    private synchronized List<String> runArt(String[] args) {

        StringsOutputStream artOutput = new StringsOutputStream();
        PrintStream console = System.out;
        PrintStream errConsole = System.err;
        System.setOut(new PrintStream(artOutput));
        System.setErr(new PrintStream(artOutput));

        ART.main(args);

        System.setOut(console);
        System.setErr(errConsole);
        
        return artOutput.getStringArrayList();

    }


    /**
     * Runs ART using a specification and sample program.
     * 
     * @param artSpecification the ART Specification
     * @param sampleProgram the sample program
     * @return A JSON object that contains the input parameters and an array of the console output lines.
     */
    public JSONObject run(String artSpecification, String sampleProgram) {

        String artFilePath = Resources.createTempFile("art", artSpecification);
        String strFilePath = Resources.createTempFile("str", sampleProgram);

        System.out.println("start " + artFilePath.hashCode());

        String[] args = {artFilePath, "!v4"};

        List<String> lines = this.runArt(args);      

        System.out.println("end " + artFilePath.hashCode());


        // create the output JSON data
        JSONObject json = new JSONObject();

        JSONObject input = new JSONObject();
        input.put("artSpecification", artSpecification);
        input.put("sampleProgram", sampleProgram);


        JSONArray outputLines = new JSONArray();
        for (String line : lines) {
            outputLines.put(line);
        }

        json.put("input", input);
        json.put("output", outputLines);

        return json;

    }


    /**
     * Returns a JSON object contain the syntax highlighting colours and the 
     * keywords that should be highlighted for the ART specification.
     * 
     * @return A JSON object containing the syntax highlighting colours and keywords
     */
    public JSONObject getARTKeywords() {
        JSONObject json = new JSONObject();
    
        List<String> accessModifiers = Arrays.asList("public", "protected", "private", "static");
        json.put("purple", accessModifiers);

        List<String> types = Arrays.asList("String", "int", "void");
        json.put("green", types);

        List<String> others = Arrays.asList("return");
        json.put("red", others);
    
        return json;
    }




}
