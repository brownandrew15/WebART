package server;

import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

public class StringsOutputStream extends OutputStream {

    private List<StringBuilder> lines;

    public StringsOutputStream() {
        this.lines = new ArrayList<StringBuilder>();
        this.lines.add(new StringBuilder());
    }

    @Override
    public void write(int b) throws IOException {
        char c = (char) b;
        if (c == '\n') {
            lines.add(new StringBuilder());
        } else {
            this.addToCurrent(c);
        }

    }

    private void addToCurrent(char c) {
        int end = this.lines.size() - 1;
        StringBuilder current = this.lines.get(end);
        current.append(c);
    }

    public List<String> getStringArrayList() {
        List<String> strings = new ArrayList<String>();
        for (StringBuilder sb : this.lines) {
            strings.add(sb.toString());
        }

        return strings;
    }


    public String toString() {
        return this.getStringArrayList().toString();
    }

}
