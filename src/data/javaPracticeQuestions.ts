export const half1Questions = [
    {
        id: 1,
        topic: "JVM Architecture & Memory",
        question: "A Java application crashes with an OutOfMemoryError: Metaspace. Explain what resides in the Metaspace and how you would diagnose this issue.",
        context: "Prior to Java 8, class metadata was stored in the PermGen space. In Java 8, PermGen was replaced by Metaspace, which resides in native memory.",
        tags: ["#Java", "#JVM", "#MemoryManagement"],
        options: [
            "Strings and arrays reside in Metaspace; diagnosis requires a heap dump analysis using jhat.",
            "Class metadata, method bytecodes, and static variables reside in Metaspace; diagnosis requires monitoring class loading and classloader leaks.",
            "Thread stacks and local objects reside in Metaspace; diagnosis involves increasing -Xss size.",
            "Compiled JIT binaries reside in Metaspace; diagnosis requires disabling dynamic compilation."
        ],
        correctOptionIndex: 1
    },
    {
        id: 2,
        topic: "Object-Oriented Design",
        question: "Analyze why 'Composition over Inheritance' is considered a best practice in modern Java design. Provide an example where inheritance causes the fragile base class problem.",
        context: "Inheritance creates a strong 'is-a' coupling between a child class and its parent. Changes to the superclass can inadvertently break the subclass logic.",
        tags: ["#OOP", "#DesignPatterns", "#CleanCode"],
        options: [
            "Inheritance makes classes final and prevents extension, while composition allows dynamic trait injection.",
            "Composition forces all objects to implement comparable interfaces, eliminating the need for Virtual Method Tables.",
            "Inheritance tightly couples classes and exposes internal implementations, while composition provides loose coupling and strict interface boundaries.",
            "Inheritance is significantly slower at runtime to dispatch methods compared to composed object graph calls."
        ],
        correctOptionIndex: 2
    },
    {
        id: 3,
        topic: "String Immutability",
        question: "If String objects are immutable in Java, explain how the '+' operator performs string concatenation under the hood without creating excessive garbage objects in Java 9+.",
        context: "In older Java versions, the compiler used StringBuilder implicitly for string concatenation. Java 9 introduced invokedynamic to handle concatenation dynamically.",
        tags: ["#Java9", "#Strings", "#Performance"],
        options: [
            "It automatically mutates the original String inside the String Pool if no other references exist.",
            "It generates a new StringBuilder explicitly for every concatenation block and converts it internally using string buffers.",
            "Using invokedynamic, the JVM defers the concatenation strategy to runtime, dynamically allocating optimal arrays via StringConcatFactory.",
            "It modifies the char array inside the existing String using native JNI code to bypass immutability."
        ],
        correctOptionIndex: 2
    },
    {
        id: 4,
        topic: "Polymorphism & Method Dispatch",
        question: "Describe the difference between static (compile-time) binding and dynamic (run-time) binding in Java. How does the JVM handle Virtual Method Tables (Vtables)?",
        context: "Method overloading relies on static binding, while method overriding relies on dynamic binding based on the actual object type at runtime.",
        tags: ["#Polymorphism", "#JVM", "#MethodDispatch"],
        options: [
            "Static binding is used for private/static/final methods resolved by the compiler, dynamic binding relies on Vtables to resolve overriden methods at runtime.",
            "Static binding is exclusively used for primitive wrapper classes, whereas dynamic binding handles deep inheritance trees.",
            "Static binding assigns type signatures dynamically via reflection, while dynamic binding locks signatures at compile time.",
            "Dynamic binding is only utilized when the 'invokedynamic' opcode is triggered by lambda expressions."
        ],
        correctOptionIndex: 0
    },
    {
        id: 5,
        topic: "Control Flow & Scoping",
        question: "What is variable shadowing in Java, and how does it complicate the execution of inner classes and lambdas that capture local variables?",
        context: "Java enforces that local variables accessed from within a lambda expression must be effectively final, preventing side-effects from shadowed references.",
        tags: ["#Scope", "#Lambdas", "#JavaFundamentals"],
        options: [
            "Shadowing allows lambdas to freely mutate local variables from the enclosing scope using hidden proxy pointers.",
            "Shadowing occurs when a variable declared in a nested scope has the same name as an outer scope variable, hiding it from reference.",
            "Shadowing deletes the outer variable permanently so memory can be safely garbage collected before lambda execution.",
            "Shadowing is a compiler mechanism that enforces all inner class variables to be volatile."
        ],
        correctOptionIndex: 1
    },
    {
        id: 6,
        topic: "Array Manipulation",
        question: "Identify the critical difference between utilizing an enhanced for-loop vs a standard for-loop when iterating over an ArrayList of objects. Which one allows safe element removal?",
        context: "Removing an element from an ArrayList while iterating using an enhanced for-loop typically raises a ConcurrentModificationException.",
        tags: ["#Arrays", "#Loops", "#Collections"],
        options: [
            "Standard for-loop allows safe removal via the array index, whereas the enhanced for-loop acts as an implicitly sealed iterator.",
            "Enhanced for-loop executes infinitely faster but does not support local variable mutation.",
            "Standard for-loop automatically resizes the array during removal, preventing any out-of-bounds exceptions.",
            "Enhanced for-loops permit safe removal natively by locking the array elements."
        ],
        correctOptionIndex: 0
    },
    {
        id: 7,
        topic: "Access Modifiers",
        question: "Which Java access modifier restricts visibility to the same package and to subclasses in different packages, and why is it useful in API library design?",
        context: "The 'protected' modifier strikes a balance between encapsulation and inheritance by opening up internal state strictly to trusted subclasses.",
        tags: ["#Inheritance", "#Encapsulation", "#Modifiers"],
        options: [
            "Public",
            "Private",
            "Protected",
            "Default (Package-Private)"
        ],
        correctOptionIndex: 2
    },
    {
        id: 8,
        topic: "Core Math Class",
        question: "Which edge case occurs when invoking Math.abs(Integer.MIN_VALUE)?",
        context: "The absolute value method generally returns the positive equivalent of a number. However, two's complement arithmetic limits positive max values.",
        tags: ["#Math", "#Primitives", "#EdgeCases"],
        options: [
            "It throws an ArithmeticException due to overflow.",
            "It returns 0 as a safe fallback.",
            "It returns Integer.MAX_VALUE successfully.",
            "It returns Integer.MIN_VALUE, remaining completely negative."
        ],
        correctOptionIndex: 3
    },
    {
        id: 9,
        topic: "Java Enums",
        question: "Which of the following capabilities is true regarding Enums in Java compared to C or C++?",
        context: "Java Enums are vastly more powerful class-types than basic integer constants.",
        tags: ["#Enums", "#OOP", "#JavaClasses"],
        options: [
            "Java enums can directly extend exactly one superclass, just like any standard Object.",
            "Java enums are restricted to holding single integer values explicitly mapped sequentially.",
            "Java enums can contain abstract methods, custom constructors, and encapsulate internal fields/state securely.",
            "Java enums bypass the compiler check for Type Safety during switch-cases natively."
        ],
        correctOptionIndex: 2
    },
    {
        id: 10,
        topic: "The final Keyword",
        question: "What is the consequence of declaring a class as 'final' in Java?",
        context: "Often used strategically in standard libraries (like String or Integer).",
        tags: ["#Keywords", "#Modifiers", "#FinalClass"],
        options: [
            "Its properties become immutable universally across all threads instantly.",
            "It prohibits the class from ever being extended or safely subclassed by another developer.",
            "It forces all internal methods to evaluate as strictly synchronized automatically.",
            "It binds the object instances directly to Metaspace instead of the standard Heap."
        ],
        correctOptionIndex: 1
    },
    {
        id: 11,
        topic: "JVM Memory Spaces",
        question: "In standard JVM architecture, where are local primitive variables and method references stored versus dynamically allocated Objects? Detail the lifecycle constraints.",
        context: "Understanding the distinction between Stack memory and Heap memory is fundamental to avoiding StackOverflow errors and memory leaks.",
        tags: ["#Memory", "#Stack", "#Heap"]
    },
    {
        id: 12,
        topic: "Interfaces in Java 8+",
        question: "What paradigm shift did 'default' methods introduce to Java interfaces in Java 8, and how does it solve the problem of interface evolution in APIs?",
        context: "Before Java 8, adding a new method to an interface broke all existing implementations of that interface.",
        tags: ["#Java8", "#Interfaces", "#APIDesign"]
    },
    {
        id: 13,
        topic: "Wrapper Classes",
        question: "Explain the concept of Autoboxing and Unboxing in Java. How can excessive autoboxing in loops negatively impact performance?",
        context: "Autoboxing seamlessly converts primitive types (like int) to their Object wrapper classes (like Integer), sometimes hiding the expensive allocation cost.",
        tags: ["#Types", "#Performance", "#Autoboxing"]
    },
    {
        id: 14,
        topic: "Constructors and State",
        question: "Explain the precise hierarchical execution order when invoking `this()` vs `super()` inside a class constructor. Why must they be on the first line?",
        context: "Constructors form chains that validate underlying object graphs before executing downstream configuration.",
        tags: ["#Constructors", "#Inheritance", "#ObjectState"]
    },
    {
        id: 15,
        topic: "GC Fundamentals",
        question: "Discuss the fundamental requirement for an Object to legally become eligible for Garbage Collection. How do cyclic references affect this?",
        context: "Unreachable graphs are critical, but many incoming students misunderstand cyclic references within a disconnected graph segment.",
        tags: ["#JVM", "#GarbageCollection", "#Roots"]
    }
];

export const half2Questions = [
    {
        id: 1,
        topic: "Java Concurrency",
        question: "Analyze the following thread execution scenario and identify the concurrency issue. Explain how to resolve it using appropriate synchronization.",
        context: "Two threads are simultaneously accessing a shared bank account to withdraw funds. Both threads pass the balance check before either deducts the amount, resulting in a negative balance.",
        tags: ["#Java", "#Concurrency", "#RaceCondition"],
        options: [
            "It is a Deadlock. Resolve by invoking yield() inside the loop block.",
            "It is a Race Condition. Resolve by marking the withdrawal method with the synchronized keyword or using an explicit ReentrantLock.",
            "It is Thread Starvation. Resolve by assigning thread priority 10 to both executing threads.",
            "It is a Livelock. Resolve by marking the balance variable as transient."
        ],
        correctOptionIndex: 1
    },
    {
        id: 2,
        topic: "Collections Framework",
        question: "Compare the internal data structures of HashMap and ConcurrentHashMap. How does Java 8's lock-striping optimization affect the performance of ConcurrentHashMap under heavy writes?",
        context: "HashMap is not thread-safe. ConcurrentHashMap provides thread safety using an array of Node locks (originally segmented locks) to increase concurrency capability.",
        tags: ["#Collections", "#Concurrency", "#HashMap"],
        options: [
            "ConcurrentHashMap locks the entire hash table for every mutation, resulting in extreme synchronization bottlenecks.",
            "ConcurrentHashMap relies solely on volatile variables and spinning yielding mechanisms internally without any actual locking.",
            "ConcurrentHashMap locks only the specific array bucket (Node) being updated, allowing vast numbers of concurrent writers to non-competing buckets.",
            "HashMap handles heavy writes significantly faster because it uses ReadWriteLock internally by default."
        ],
        correctOptionIndex: 2
    },
    {
        id: 3,
        topic: "Exception Handling",
        question: "Why should you never catch the top-level 'Exception' or 'Throwable' classes in a typical production application, and what are the architectural consequences?",
        context: "Catching Throwable intercepts critical JVM errors like OutOfMemoryError and StackOverflowError, preventing the application from shutting down gracefully.",
        tags: ["#Exceptions", "#BestPractices", "#Architecture"],
        options: [
            "Because catching them slows down code execution drastically during try-catch resolution checks.",
            "Because it intercepts critical system Errors (like OutOfMemoryError), causing the application to proceed in an unstable or corrupted state.",
            "Because catching them prevents log files from recording standard trace hierarchies.",
            "Because 'Throwable' cannot be legally compiled within a catch block since Java 7."
        ],
        correctOptionIndex: 1
    },
    {
        id: 4,
        topic: "Java NIO & I/O",
        question: "Explain the difference between Blocking I/O (java.io) and Non-Blocking I/O (java.nio). How does the Selector component enable multiplexing?",
        context: "Traditional I/O requires a dedicated thread per connection. NIO uses Selectors to allow a single thread to monitor multiple network channels simultaneously.",
        tags: ["#NIO", "#Networking", "#Scalability"],
        options: [
            "Selectors assign identical thread limits strictly enforced by the OS kernel, reducing blocking risks.",
            "A Single Selector can monitor events across hundreds of open Channels, preventing threads from idling on unready connections.",
            "Selectors act as raw hardware DMA bypasses directly copying memory into system pages instantaneously.",
            "Blocking I/O leverages UDP selectively, while Selector seamlessly bridges TCP stream gaps natively."
        ],
        correctOptionIndex: 1
    },
    {
        id: 5,
        topic: "Streams API",
        question: "What is the difference between intermediate and terminal operations in the Java Streams API? Provide an example of short-circuiting.",
        context: "Intermediate operations (like filter, map) are lazy and return another stream. Terminal operations (like collect, findFirst) trigger the actual execution pipeline.",
        tags: ["#Streams", "#FunctionalProgramming", "#Java8"],
        options: [
            "Intermediate operations eagerly parse the entire dataset, terminal pipelines lazily execute code like findFirst().",
            "Intermediate operations execute instantly mutating the source structure, terminal operations only process results to JSON.",
            "Intermediate operations are lazy and return Stream<T>. Terminal operations execute the pipeline, and operators like findFirst() short-circuit processing once a match is identified.",
            "Terminal operations completely stop JVM operation, while intermediate seamlessly loop until exit codes are fired."
        ],
        correctOptionIndex: 2
    },
    {
        id: 6,
        topic: "JDBC & PreparedStatement",
        question: "Why is the use of PreparedStatement highly favored over standard Statement interfaces when executing user-provided SQL queries?",
        context: "Using raw string concatenation for SQL queries exposes applications to severe SQL injection vulnerabilities. PreparedStatement pre-compiles and escapes input data.",
        tags: ["#Database", "#Security", "#JDBC"],
        options: [
            "It automatically executes transactions immediately on the local cache before reaching out to the specific disk node.",
            "It pre-compiles the query and automatically sanitizes/escapes parameters protecting against SQL injection.",
            "It uses native JDBC reflection to detect primary keys instantly without hitting metadata indexing tables.",
            "It caches results globally across the JVM ensuring extreme high throughput scaling."
        ],
        correctOptionIndex: 1
    },
    {
        id: 7,
        topic: "Functional Interfaces",
        question: "Differentiate between the Function, Consumer, Supplier, and Predicate core functional interfaces introduced in Java 8.",
        context: "Java 8 introduced the java.util.function package containing standardized functional interfaces to be used extensively with lambda expressions.",
        tags: ["#Lambdas", "#Java8", "#Functional"],
        options: [
            "Supplier takes input and generates a boolean; Consumer returns string outputs endlessly.",
            "Function maps T to R; Predicate tests T and returns boolean; Consumer consumes T without return; Supplier provides T without input.",
            "Predicate mutates variables logically; Consumer tests conditional boolean blocks; Function parses JSON streams.",
            "They all fundamentally inherit exactly from java.util.concurrent.Callable mapping types natively."
        ],
        correctOptionIndex: 1
    },
    {
        id: 8,
        topic: "Thread Synchronization",
        question: "What is the fundamental difference in object monitors when a thread invokes wait() versus when it invokes sleep()?",
        context: "Both methods pause thread execution, but wait() releases the acquired synchronized monitor lock while sleep() holds tightly onto it.",
        tags: ["#Multithreading", "#Locks", "#Concurrency"],
        options: [
            "Wait() releases the monitor lock allowing other threads to enter the synchronized block, whereas sleep() holds onto the monitor lock tightly.",
            "Sleep() is purely meant for kernel mode IO locking while Wait() is only applicable for frontend event queues.",
            "Wait() completely terminates the thread garbage collecting it, while Sleep() loops infinitely.",
            "Sleep() is dynamically interrupted by exceptions, whereas wait() gracefully drops thread exceptions natively."
        ],
        correctOptionIndex: 0
    },
    {
        id: 9,
        topic: "Java Reflection",
        question: "What is the primary danger or bottleneck when utilizing the Java Reflection API extensively in production code arrays?",
        context: "Frameworks like Spring rely heavily on reflection, but standard developers are often cautioned against direct usage.",
        tags: ["#Reflection", "#API", "#Performance"],
        options: [
            "It strictly enforces compilation limits bypassing JAR structures natively.",
            "It routinely bypasses the JVM’s security manager and JIT optimization routes, causing severe performance degradation and breaking encapsulation.",
            "It exclusively crashes classes loaded dynamically through the Bootstrap ClassLoader.",
            "It hard-locks synchronized threads instantly generating immediate system livelocks."
        ],
        correctOptionIndex: 1
    },
    {
        id: 10,
        topic: "CompletableFuture API",
        question: "How does CompletableFuture resolve the traditional callback-hell issue presented by older Future and Callable APIs?",
        context: "Java 8 updated the async model with CompletableFuture allowing responsive, functional-style compositions.",
        tags: ["#Async", "#Futures", "#CompletableFuture"],
        options: [
            "It enforces entirely synchronous execution blocks preventing asynchronous divergence completely.",
            "It relies entirely on RxJava syntax imports to operate smoothly.",
            "It supports non-blocking functional chaining via methods like thenApply() and thenCompose(), seamlessly connecting asynchronous dependent stages.",
            "It actively pauses all child threads globally to resolve dependencies sequentially in the OS kernel directly."
        ],
        correctOptionIndex: 2
    },
    {
        id: 11,
        topic: "Advanced Streams",
        question: "When processing nested Collections (e.g., a List of Lists) in a Stream pipeline, discuss how the flatMap operator provides structural transformations missing from standard map().",
        context: "Using standard map() on nested structures results in Stream<List<T>>, adding unnecessary depth to subsequent Stream processing operations.",
        tags: ["#Streams", "#DataProcessing", "#flatMap"]
    },
    {
        id: 12,
        topic: "Garbage Collection",
        question: "Explain the primary goal of the G1 (Garbage First) Garbage Collector, which became the default in Java 9. How does it manage Heap memory regions differently than the Parallel GC?",
        context: "Unlike older collectors that divide the heap into contiguous Young and Old generations, G1 dynamically splits the heap into identically sized regions to meet soft real-time pause targets.",
        tags: ["#JVM", "#GarbageCollection", "#Performance"]
    },
    {
        id: 13,
        topic: "Designing Thread-Safe Classes",
        question: "If tasked with designing a completely thread-safe caching class from scratch in Java, what synchronization primitives would you select, and how would you structure the read/write lock hierarchy?",
        context: "Avoiding standard synchronized methods yields significantly higher burst throughput capabilities.",
        tags: ["#Concurrency", "#ThreadSafety", "#Locks"]
    },
    {
        id: 14,
        topic: "CompletableFutures vs Native Threads",
        question: "Argue the architectural benefits of utilizing CompletableFuture and the ForkJoinPool natively compared to manually orchestrating raw Thread instances executing Runnable blocks.",
        context: "Thread orchestration and pooling directly affect OS virtualization load parameters.",
        tags: ["#Async", "#Threads", "#Architecture"]
    },
    {
        id: 15,
        topic: "Generics Wildcards",
        question: "Detail the PECS principle ('Producer Extends, Consumer Super') for Generic wildcards. Why does Java mandate this mechanism to preserve type safety in mixed collections?",
        context: "The '? extends T' and '? super T' boundaries represent critical safety layers against runtime heap pollution.",
        tags: ["#Generics", "#Types", "#Covariance"]
    }
];

// The user purely wanted a 20 question full test (15 MCQs, 5 Theory)
const fullMCQs = [...half1Questions.slice(0, 8), ...half2Questions.slice(0, 7)]; // 15 MCQs combined
const fullTheory = [...half1Questions.slice(10, 13), ...half2Questions.slice(10, 12)]; // 5 Theory combined

export const fullQuestions = [...fullMCQs, ...fullTheory].map((q, index) => ({
    ...q,
    id: index + 1
}));
