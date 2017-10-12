# 实验目的

掌握R语言中常用的数据集编辑函数，并对数据集进行编辑操作

# 实验原理

R语言可以对数据集进行访问、修改、连接、合并等操作，下面的例子新建一个数据集并对其进行数据编辑

# 实验步骤

新建student数据集，并查看该数据集结构

```
> student <- data.frame(ID=c(11,12,13),Name=c("Devin","Edward","Wenli"),Gender=c("M","M","F"),Birthdate=c("1984-12-29","1983-5-6","1986-8-8"))
> str(student)
'data.frame':    3 obs. of  4 variables:
 $ ID       : num  11 12 13
 $ Name     : Factor w/ 3 levels "Devin","Edward",..: 1 2 3
 $ Gender   : Factor w/ 2 levels "F","M": 2 2 1
 $ Birthdate: Factor w/ 3 levels "1983-5-6","1984-12-29",..: 2 1 3
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_37.png)

更改student数据集中Name和Birthdate数据类型并查看数据结构

```
> student$Name<-as.character(student$Name)
> student$Birthdate<-as.Date(student$Birthdate)
> str(student)
'data.frame':    3 obs. of  4 variables:
 $ ID       : num  11 12 13
 $ Name     : chr  "Devin" "Edward" "Wenli"
 $ Gender   : Factor w/ 2 levels "F","M": 2 2 1
 $ Birthdate: Date, format: "1984-12-29" "1983-05-06" "1986-08-08"
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_38.png)

利用student中数据列Birthdate计算年龄

```
> student<-within(student,{
+     Age<-as.integer(format(Sys.Date(),"%Y"))-as.integer(format(Birthdate,"%Y"))
+ })
> student
  ID   Name Gender  Birthdate Age
1 11  Devin      M 1984-12-29  33
2 12 Edward      M 1983-05-06  34
3 13  Wenli      F 1986-08-08  31
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_39.png)

下面的代码生成新数据集score，并将score与student进行连接生成新数据集result

```
> score<-data.frame(SID=c(11,11,12,12,13),Course=c("Math","English","Math","Chinese","Math"),Score=c(90,80,80,95,96))
> result<-merge(student,score,by.x="ID",by.y="SID")
> result
  ID   Name Gender  Birthdate Age  Course Score
1 11  Devin      M 1984-12-29  33    Math    90
2 11  Devin      M 1984-12-29  33 English    80
3 12 Edward      M 1983-05-06  34    Math    80
4 12 Edward      M 1983-05-06  34 Chinese    95
5 13  Wenli      F 1986-08-08  31    Math    96
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_40.png)

