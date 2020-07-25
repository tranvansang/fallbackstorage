# Fallback Storage [![Build Status](https://travis-ci.org/tranvansang/fallbackstorage.svg?branch=master)](https://travis-ci.org/tranvansang/fallbackstorage)
[![NPM](https://nodei.co/npm/fallbackstorage.png)](https://nodei.co/npm/fallbackstorage/)

A fallback chain for localStorage/sessionStorage/memoryStorage.

## Usage

```javascript
import {getSafeStorage} from 'fallbackstorage'
```

`getSafeStorage` check for availability and returns `window.localStorage`, or `window.sessionStorage` if they are available.
Otherwise, it returns the manually implemented `MemoryStorage` instance.

The `MemoryStorage` implementation follows the specification defined at [whatwg](https://html.spec.whatwg.org/multipage/webstorage.html#storage-2).

## Why this package

In safari's private mode, or when the user has disabled local storage, the `window.localStorage` object is available (i.e., not null) but does not allow using `storage.setItem`.
Therefore, the availability check is not straightforward as it seems to be.
