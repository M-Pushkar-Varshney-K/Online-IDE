export const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
  cpp: "10.2.0",
  c: "10.2.0",
};
export const LANGUAGE_EXTENSIONS: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  java: "java",
  csharp: "cs",
  php: "php",
  cpp: "cpp",
  c: "c",
};

export const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  python: "Python",
  java: "Java",
  csharp: "C#",
  php: "PHP",
  cpp: "C++",
  c: "C",
};
export const EXTENSIONS_TO_LANGUAGES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  java: "java",
  cs: "csharp",
  php: "php",
  cpp: "cpp",
  c: "c",
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
        System.out.println("Hello, World!");
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
greet();
`,
  cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!";
    return 0;
}
`,
  c: `#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}`,
};
