# 实验目的

掌握R语言中统计作图函数的用法

# 实验原理

通过统计作图函数绘制的图标可以直观地反映出数据及统计量地性质及其内在规律，如盒图可以表示多个样本地均值，误差条形图能同时显示下限误差和上限误差，最小二乘拟合曲线图能分析两变量间的关系。

# 实验步骤

常用的统计作图函数列举如下：

| 函数名 | 函数功能 |
| :--- | :--- |
| barplot\(\) | 绘制简单条形图 |
| pie\(\) | 绘制饼图 |
| hist\(\) | 绘制二维条形直方图，可以显示数据的分配情况 |
| boxplot\(\) | 绘制箱形图 |
| plot\(\) | 绘制线性二维图、折线图、散点图 |

## 1、barplot

下面的代码随机生成"a","b","c"三种数据，并绘制饼图

```
> x <- sample(rep(c("a","b","c"),20),50)
> counts <- table(x)
> barplot(counts)
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/barplot.jpeg)

## 2、pie

下面的代码利用上面的数据绘制饼图

```
> pct <- round(counts/sum(counts)*100)
> lbls <- paste(c("a","b","c"),pct,"%")
> pie(counts,labels=lbls)
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/pie.jpeg)

## 3、hist

下面的代码生成100个随机数，绘制直方图并添加密度曲线

```
> x <- sample(1:999,100)%%100
> hist(x,freq=FALSE,breaks=7)
> lines(density(x),col="red")
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/hist.jpeg)

## 4、boxplot

下面的代码生成两组随机数并绘制箱线图

```
> x1 <- c(rnorm(50,5,2),11,1)
> x2 <- c(rnorm(50,7,4),10,2)
> boxplot(x1,x2,notch=TRUE)
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/boxplot.jpeg)

## 5、plot

下面的代码使用plot\(\)函数绘制正弦函数曲线

```
> x <- seq(from=0,to=2*pi,length=100)
> y <- sin(x)
> plot(x,y,type="l")
```

![](https://tjxlab.gitbooks.io/bigdata/content/assets/plot.jpeg)

