---
title: "Why TDD Forces You to Write Better Object-Oriented Code"
description: "Discover how TDD improves object-oriented design by identifying and solving design problems, leading to more testable, maintainable code"
datePublished: 2026-01-29 22:49:20
tags: ["tdd", "object-oriented-programming", "architecture"]
---

If you have 2-3 years of programming experience, you've probably heard that you should write tests. But have you ever thought about TDD (Test-Driven Development) as a design tool rather than just a testing tool?

In this article, I'll share my experience and show how TDD can help you write better object-oriented code.

## The Problem: "This Class Is Hard to Test"

I often hear from programmers: "It's hard to write a test for this class."

My experience shows that this usually means:
1. The class was designed **before** the tests were written
2. The class design violates the **SOLID principles**

This is not a testing problem. This is a design problem.

## How TDD Enforces Better Design

When you write a test first, you immediately notice whether your class is well designed. Let's look at some examples.

### Example 1: Too Many Responsibilities (SRP Violation)

We implement first, because we know what needs to be done, right? What do we get as a result?

**Hard to test:**
```java
public class OrderProcessor {
    public BigDecimal process(Order order) {
        // Validate order
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order is empty");
        }

        // Calculate total
        BigDecimal total = order.getItems().stream()
            .map(Item::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Save to database
        DatabaseConnection db = new DatabaseConnection();
        db.save(order);

        // Send email
        EmailService email = new EmailService();
        email.send(order.getCustomer(), "Your order has been processed");

        return total;
    }
}
```

Why is this hard to test? You need a database and email service just to run one simple test.

**TDD approach - test first:**
```java
@Test
void orderTotalIsCalculatedCorrectly() {
    OrderCalculator calculator = new OrderCalculator();
    Order order = new Order(List.of(
        new Item(BigDecimal.valueOf(10)),
        new Item(BigDecimal.valueOf(20))
    ));

    BigDecimal result = calculator.calculateTotal(order);

    assertEquals(BigDecimal.valueOf(30), result);
}
```

This test forces you to separate responsibilities:

```java
public class OrderCalculator {
    public BigDecimal calculateTotal(Order order) {
        return order.getItems().stream()
            .map(Item::getPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}

public class OrderValidator {
    public void validate(Order order) {
        if (order.getItems().isEmpty()) {
            throw new IllegalArgumentException("Order is empty");
        }
    }
}

public class OrderProcessor {
    private final OrderValidator validator;
    private final OrderCalculator calculator;
    private final OrderRepository repository;
    private final NotificationService notifier;

    public OrderProcessor(OrderValidator validator,
                          OrderCalculator calculator,
                          OrderRepository repository,
                          NotificationService notifier) {
        this.validator = validator;
        this.calculator = calculator;
        this.repository = repository;
        this.notifier = notifier;
    }
}
```

### Example 2: Hidden Dependencies (DIP Violation)

It's normal that we just use classes needed to achieve expected result, especially when we need to implement an urgent change.

**Hard to test:**
```java
public class ReportGenerator {
    public Report generate() {
        List<Data> data = new DatabaseConnection().fetchAll(); // Hidden dependency!
        return format(data);
    }
}
```

**TDD approach:**
```java
@Test
void reportFormattingWorksCorrectly() {
    DataRepository mockRepository = mock(DataRepository.class);
    when(mockRepository.fetchAll()).thenReturn(testData);

    ReportGenerator generator = new ReportGenerator(mockRepository);
    Report result = generator.generate();

    assertEquals(expectedFormat, result);
}
```

TDD forces you to inject dependencies:

```java
public class ReportGenerator {
    private final DataRepository repository; // Dependency is now explicit

    public ReportGenerator(DataRepository repository) {
        this.repository = repository;
    }

    public Report generate() {
        List<Data> data = repository.fetchAll();
        return format(data);
    }
}
```

## The Core Lesson

> If it's hard to write a test, the design is wrong.

TDD is not just a testing technique. It's a feedback mechanism that immediately tells you when your design has problems:

| Test Symptom | Design Problem |
|--------------|----------------|
| Too much setup needed | Class has too many dependencies |
| Need to test private methods | Class does too much (SRP) |
| Lots of mocking required | Tight coupling |
| Test is fragile | Implementation details are leaking |

## Practical Tip

Next time you think "this class is hard to test", stop and ask yourself:

1. How many responsibilities does this class have?
2. Are all dependencies explicit (via constructor)?
3. Can I use this class without starting the entire application?

If the answer to question 2 or 3 is "no", you've found a design problem - and that's exactly what TDD is trying to tell you.

## Conclusion

TDD forces you to think about your code design **before** you write the implementation. The result? Smaller classes, explicit dependencies, and code that's easy to test and maintain.

Start small: tomorrow, write one test before you write the code. You'll be amazed at how differently you start thinking about your design.

---

*I'm curious: do you mock everything you can in unit tests? Let me know in the comments!*