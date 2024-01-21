---
title: Valid Sudoku - Leetcode bytes 0
description: This is one of my favorite data structures that I learned in the past couple months.
tags: 
    - 'HashSet'
    - 'Algorithms'
    - 'Matrix'
categories:
    - 'Bytes'
    - 'Algorithms'
date: "2024-01-20T22:00:00-03:00"
draft: false
---

I want to introduce Leetcode Bytes. A series of bytes that will cover some 
leetcode problems I find interesting in some way.

This is just a way to talk about how I solved a particular problem, and this
don't mean that I necessarily got the best or fastest solution, it is just my
perspective and journey by solving a problem.

Enough with explanations, let me start by introducing the question at hand to 
you. The problem description states:

> Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:
> - Each row must contain the digits 1-9 without repetition.
> - Each column must contain the digits 1-9 without repetition.
> - Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.

Just by reading the problem description, we can already lean towards a way to 
approach this problem: HashSets. Everytime something required unique entries, a
hashset is immediatly what comes into mind, So lets try to approach this problem
by using one (or a few).

Before actually coding, lets break down the solution and check wether we 
understood what we have to do, this is the moment we can plan our approach and
figure out on our heads (or on a whiteboard) how we might even start coding the
solution.

## What makes a sudoku valid

For a sudoku to be valid, any ith digit cannot be seen more than once on its
column or row, or inside its own 3x3 box. Lets illustrate that with the following
board:

<div align="center">

![](/images/bytes/valid-sudoku/example-sudoku-board.png)

</div>

Taking the first number on the first row and column (5), for that specific 
digit to be valid, we cannot have any other instances of it in the same row, 
column and box. For this digit, we can clearly see that it is on a valid 
position.

Since we can mostly validate our log until now, we can start figuring out how we
can determine that those 3 rules apply to a number. As we said before, HashSets
are great for uniqueness, so let's use that.

## Have we seen this digit before?

For each specific index, we want to know if we saw that digit before on its 
column and row, and since every sudoku board is a 9x9 square matrix, we can 
store each row and column on an array of HashSets:

```rust
impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        use std::collections::HashSet;
        let mut rows: [HashSet<char>; 9] = Default::default();
        let mut cols: [HashSet<char>; 9] = Default::default();
    }
}
```

Here, we declare 2 variables called `rows` and `cols` that are char hashsets.
`Default::default()` just initialized those variables to an array with 9 empty
HashSets.

Now, we can traverse the matrix and start checking each index individually. So
lets do that

```rust
impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        use std::collections::HashSet;
        let mut rows: [HashSet<char>; 9] = Default::default();
        let mut cols: [HashSet<char>; 9] = Default::default();

        for row in 0..board.len() {
            for col in 0..board.len() {
                if rows[row].contains(&board[row][col]) {
                    return false;
                }
                if cols[col].contains(&board[row][col]) {
                    return false;
                }

                rows[row].insert(board[row][col]);
                cols[col].insert(board[row][col]);
            }
        }
    }
}
```

Here we start by checking if our HashSet contains the value we are currently
visiting, we check specific for the row and column we are, which we are the
index of ther inner and outer loops. If we saw the value before, we can just
stop everything and return false, as this sudoku is now invalid.

This seems to cover the column and rows rules. But we certainly could still find
a board that has all rows and columns valid, but repeats digits on the 3x3 boxes
so we also have to address that, luckily, theres an easy way to do this.

## How do we check the boxes?

This was the most interesting part about this problem, and it also was the part
that took me the longest to figure out a very specific part, but let's not get
ahead of ourselves. In order to check the boxex, the easiest way is to simply
declare another array of HashSets called boxes.

```rust
impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        use std::collections::HashSet;
        let mut rows: [HashSet<char>; 9] = Default::default();
        let mut cols: [HashSet<char>; 9] = Default::default();
        let mut boxes: [HashSet<char>; 9] = Default::default();

        /* ... */
    }
}
```

A sudoku board is made by 9 3x3 squares, and each of those cannot have any 
repeated digits inside its bounds. Each index of our array represents one of 
those squares. We will call them Boxes.

But this leaves us with a problem. How can we figure out which box an specific
rows/column value lives in?

Let's look at it this way, a sudoku board is made by 9 boxes, each box is made 
by 3 rows and 3 columns. So for each row of boxes, we have 3 columns of boxes,
essentially, we have a 3x3 matrix of boxes.

If we divide any row number by the number of rows of boxes, we will get the 
index of the row on that 3x3 matrix that our digit lives. Similarly, if we do 
the same with the column, we will get the column index for that row. This means
that `boxes[row / 3][col / 3]` is the box we are currently looking at, but as 
you can tell, this would only work if our boxes variable were a 2D array. which
is not the case.

But this is not a problem, if we think about it, each row of that 2D array would
map exactly 3 indexes after the one before. So if the first row is `boxes[0]`,
the second would be `boxes[3]` and the last one would be `boxes[6]`.

This makes sense, so our formula for finding the index of the box we have to 
look is `row / 3 * 3 + col / 3`. It makes sense right?

Now that we know this, we can easily check each box on our loop:

```rust
impl Solution {
    pub fn is_valid_sudoku(board: Vec<Vec<char>>) -> bool {
        use std::collections::HashSet;
        let mut rows: [HashSet<char>; 9] = Default::default();
        let mut cols: [HashSet<char>; 9] = Default::default();
        let mut boxes: [HashSet<char>; 9] = Default::default();

        for row in 0..board.len() {
            for col in 0..board.len() {
                if board[row][col] == '.' {
                    continue;
                }
                if rows[row].contains(&board[row][col]) {
                    return false;
                }
                if cols[col].contains(&board[row][col]) {
                    return false;
                }
                let box_idx = row / 3 * 3 + col / 3;
                if boxes[box_idx].contains(&board[row][col]) {
                    return false;
                }
                rows[row].insert(board[row][col]);
                cols[col].insert(board[row][col]);
                boxs[box_idx].insert(board[row][col]);
            }
        }
        true
    }
}
```

Notice that we get the boxes index using our formula, and check if the HashSet
on that index contains the value, and as all the other conditions, we return 
false if it contains. Also notice that I added another condition, which skips
any dots '.' as we are not interested in checking empty squares.

If we finish traversing our entire matrix without finding any repeating digits
we can safely say that it is a valid sudoku. So we just return true on the end.

## Conclusion

I really enjoyed this problem as it challenged me to figure out that little 
funny formula for finding the index of the box. And I really appreciated the
simplicity of the problem. Although it might seem confusing at first.

You can check out the actual code for the problem 
[on my Github](https://github.com/wllfaria/leet-the-code/tree/main/problems/leetcode/36-valid-sudoku), 
this will be true for every other leetcode bytes that I will eventually write.

Hope you enjoyed this reading. Love you
