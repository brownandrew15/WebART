package art;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import cmd.ScriptWriter;
import server.ARTServer;
import server.Resources;
import server.ServerOS;

/**
 * Interface between WebART and the ART.jar library that returns JSON data 
 */
public class ARTRunner {

    /**
     * Deletes the directory with the input files.
     * This is run to keep the storage usage of WebART low.
     * User data is only stored for the time it is needed.
     * 
     * @param dir the directory to delete
     */
    private void deleteInput(String dir) {
        File directory = new File(dir);
        String[]entries = directory.list();
        for(String s : entries){
            // delete the content of the directory
            File currentFile = new File(directory.getPath(),s);
            currentFile.delete();
        }
        // delete the directory
        directory.delete();
    }

    /**
     * Writes the scripts to run the Attribute Grammar mode of ART.
     * 
     * @param dir the directory to write the scripts to
     */
    private void writeAttributes(String dir) {
        ScriptWriter.writeAttributes("run", dir);
    }

    /**
     * Writes the scripts to run the eSOS mode of ART.
     * 
     * @param dir the directory to write the scripts to
     */
    private void writeESOS(String dir) {
        ScriptWriter.writeESOS("run", dir);
    }


    /**
     * Saves the input from the front end into files.
     * 
     * @param dir the directory to save the input to
     * @param artSpecification the art specification
     * @param sampleProgram the sample program
     */
    private void saveInput(String dir, String artSpecification, String sampleProgram) {
        try {
            Resources.createFile("webart.art", dir, artSpecification);
            Resources.createFile("webart.str", dir, sampleProgram);
        } catch (IOException e) {

        }
    }


    /**
     * Runs ART using a specification and sample program.
     * 
     * @param artSpecification the ART Specification
     * @param sampleProgram the sample program
     * @return A JSON object that contains the input parameters and an array of the console output lines.
     */
    public JSONObject run(String artSpecification, String sampleProgram, int version) {

        String dir = Resources.createRandomDir();

        this.saveInput(dir, artSpecification, sampleProgram);

        // write the scripts that run ART in the correct mode
        if (version == 3) {
            this.writeAttributes(dir);
        }  else if (version == 4) {
            this.writeESOS(dir);
        }

        // run the script for the correct OS and store the output
        List<String> lines;
        if (ServerOS.isWindows()) {
            lines = ARTServer.getCMDRunner().run(dir + "\\run.bat");
        } else if (ServerOS.isMac() || ServerOS.isUnix()) {
            lines = ARTServer.getCMDRunner().run("sh ./" + dir + "/run.sh");
        } else {
            lines = new ArrayList<String>();
            lines.add("Server OS is not Windows or Unix!");
        }

        // delete the folder of input files 
        this.deleteInput(dir);
        
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

}
