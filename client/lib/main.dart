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
        body: WebViewExample(
          videoId: '3-lz0ejzadM',
        ),
      ),
    );
  }
}

class WebViewExample extends StatefulWidget {
  final String videoId;

  WebViewExample({this.videoId});

  @override
  _WebViewExampleState createState() => _WebViewExampleState();
}

class _WebViewExampleState extends State<WebViewExample> {
  final Completer<WebViewController> _controller = Completer<WebViewController>();

  var _videoUrl;

  @override
  void initState() {
    super.initState();

    _videoUrl = 'https://www.youtube.com./embed/' + widget.videoId;

    if (kIsWeb) {
      final IFrameElement _iframeElement = IFrameElement();
      _iframeElement.allowFullscreen = true;
      _iframeElement.src = _videoUrl;

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
      initialUrl: _videoUrl,
    );
  }
}
