import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ijustwannaseewonwoo',
      home: Scaffold(
        appBar: AppBar(
          title: Text('ijustwannaseewonwoo'),
        ),
        body: Center(
          child: Text('원우야 보고 싶다.'),
        ),
      ),
    );
  }
}
