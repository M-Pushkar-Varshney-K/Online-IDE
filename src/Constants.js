export const LANGUAGE_VERSIONS = {
  cpp: "6", // JDoodle language and version index
  javascript: "4",
  typescript: "0",
  python3: "5",
  java: "5",
  kotlin: "4",
  php: "5",
};
/* Bugs:
1. If we control z then the previous code comes but not change the previous language 
2. we can not change the size of output window and ca not hide the output screen */
  export const PRE_CODE = {
    javascript: `//write your code\nfunction greet(name) {\n\tconsole.log("Hello," + {name} + "!");\n}\n\ngreet("user.name");`,
    python: `# write your code\ndef greet(name="MPVK"):\n    print(f"Hello, {name}!")\n\ngreet("user.name")`,
    java: `//write your code\npublic class Greet {\n    public static void main(String[] args) {\n        String name = "MPVK";\n        System.out.println("Hello, " + name + "!");\n    }\n}`,
    cpp: `//write your code\n#include <iostream>\n\nint main() {\n    std::string name = "MPVK";\n    std::cout << "Hello, " << name << "!" << std::endl;\n    return 0;\n}`,
    typescript: `//write your code\nfunction greet(name: string): void {\n    console.log("Hello," + {name || "MPVK"} + "!");\n}\n\ngreet("user.name");`,
    kotlin: `//write your code\nfun greet(name: String = "MPVK") {\n    println("Hello, $name!")\n}\n\ngreet("user.name")`,
    php: `//write your code\n<?php\nfunction greet(string $name = "MPVK") {\n    echo "Hello, " . $name . "!";\n}\n\ngreet("user.name");\n?>`,
  };