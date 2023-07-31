package cmd;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

public class CMDRunner {


    public List<String> run(String command) {

        System.out.println("Command: " + command);

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

            List<String> errors = new ArrayList<String>();
            String e = null;
            while ((e = stdError.readLine()) != null) {
                errors.add(e);
            }

            if (errors.size() > 0) {
                output.add("");
                output.add("There were errors during execution:");
                for (String error : errors) {
                    output.add(error);
                }
            }

        } catch (Exception e) {
            output.add(e.getMessage());
        }

        return output;

    }

    
}
