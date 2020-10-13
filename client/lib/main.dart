import 'dart:async';
import 'dart:convert';
import 'dart:io' as io;
import 'dart:html';
import 'dart:ui' as ui;

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

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
        body: WebViewExample(),
      ),
    );
  }
}

class WebViewExample extends StatefulWidget {
  @override
  _WebViewExampleState createState() => _WebViewExampleState();
}

class _WebViewExampleState extends State<WebViewExample> {
  final Completer<WebViewController> _controller = Completer<WebViewController>();

  @override
  void initState() {
    super.initState();

    if (kIsWeb) {
      final IFrameElement _iframeElement = IFrameElement();
      _iframeElement.src = 'https://www.youtube.com./embed/3-lz0ejzadM';

      ui.platformViewRegistry.registerViewFactory('iframeElement', (int viewId) => _iframeElement);

    } else if (io.Platform.isAndroid) {
      WebView.platform = SurfaceAndroidWebView();
    }
  }

  Widget _iframeWidget = HtmlElementView(
    key: UniqueKey(),
    viewType: 'iframeElement',
  );

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      final _width = MediaQuery.of(context).size.width;
      final _height = _width * (9 / 16);

      return SizedBox(
        width: _width,
        height: _height,
        child: _iframeWidget,
      );
    }

    return WebView(
      initialUrl: 'https:/flutter.dev',
    );
  }
}
