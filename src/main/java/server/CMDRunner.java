package server;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CMDRunner {


    public List<String> run(String command) {

        String[] commands = command.split(" ");

        List<String> output = new ArrayList<String>();

        try {

            Runtime rt = Runtime.getRuntime();
            Process proc = rt.exec(commands);

            BufferedReader stdInput = new BufferedReader(new 
                InputStreamReader(proc.getInputStream()));

            BufferedReader stdError = new BufferedReader(new 
                InputStreamReader(proc.getErrorStream()));


            String s = null;
            while ((s = stdInput.readLine()) != null) {
                output.add(s);
            }

        } catch (Exception e) {
            output.add(e.getMessage());
        }

        return output;

    }

    
}
