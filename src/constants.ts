export const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

export const CODE_SNIPPETS: Record<string, string> = {
  javascript: `function greet() {
  console.log("Hello, World!");
}

// Call the greet function
 greet();
`,
  typescript: `function greet() {
  console.log("Hello, World!");
}

// Call the greet function
// greet();
`,
  python: `def greet():
    print("Hello, World!")

# Call the greet function
greet()
`,
  java: `public class Main {
    public static void main(String[] args) {
        // System.out.println("Hello, World!");
    }
}
`,
  csharp: `class Program
{
    static void Main()
    {
        System.Console.WriteLine("Hello, World!");
    }
}
`,
  php: `<?php
function greet() {
    echo "Hello, World!";
}

// Call the greet function
// greet();
`,
};
